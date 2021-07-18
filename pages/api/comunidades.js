//import { SiteClient } from 'dadocms-client'
const { SiteClient } = require('datocms-client');

export default async function requestsReceiver(request, response) {

  if(request.method === 'POST') {
    const TOKEN = '053d6a8eebf90a1ddb0edb5a0b74a8';
    const client = new SiteClient(TOKEN);

    //Valida os dados
    const registroCriado = await client.items.create({
        itemType: "975840", //ID do Model de Communities criado pelo Dato
        ...request.body, 
       //title: "Comunidade da Cris",
       // imageUrl: "https://github.com/ccampanha.png",
       // creatorSlug: "ccampanha"
    })

      console.log(registroCriado);
    
      response.json({
        dados:'algum dado qualquer',
        registroCriado: registroCriado,
      })
      return;
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  })
}