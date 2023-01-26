let theme = document.querySelector('.theme');
let search = document.querySelector('.search');
let form = document.createElement('form');
let input = document.createElement('input');
let button = document.createElement('input');
let br = document.createElement('br');
let content = document.createElement('div');

content.classList.add('address');
input.classList.add('cep');
button.classList.add('search-address');

search.appendChild(form);
form.appendChild(input);
form.appendChild(button);
search.appendChild(br);
theme.appendChild(content);

form.setAttribute('method', 'GET');
input.setAttribute('type', 'text');
input.setAttribute('maxlength', '8');
input.setAttribute('placeholder', 'Digite o CEP: 40000000');
input.setAttribute('required', 'true');
button.setAttribute('type', 'submit');
button.setAttribute('value', 'Buscar endereço');

// console.log(input);

button.addEventListener('click', (e) => {
  e.preventDefault();
  if(input.value.length > 0) {
    submit();
  } else {
    alert('Preencha todos os campos')
  }

  input.value = '';
});

const render = (result) => {

  let address = [
    `Endereço: ${result.cep}, ${result.logradouro}, ${result.bairro}, ${result.localidade}/${result.uf}.`
  ]


  content.innerHTML = address ;

}

async function submit() {
    const validCep = /([0-9]{8})/g;

    if(validCep.test(input.value)) {
      let req = await fetch('https://viacep.com.br/ws/'+ input.value +'/json/');
      let result = await req.json();

      if(!result.erro ){
        content.classList.remove('danger');
        content.classList.add('address');
        render(result);
       } else {
         content.innerHTML = 'CEP inválido, por favor verificar o CEP digitado!';
         content.classList.remove('address');
         content.classList.add('danger');
       }
    } else {
      content.innerHTML = 'CEP inválido, por favor verificar o CEP digitado!';
      content.classList.remove('address');
      content.classList.add('danger');
    }
}
