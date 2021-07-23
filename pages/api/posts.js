import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequestsPost(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '053d6a8eebf90a1ddb0edb5a0b74a8';
        const client = new SiteClient(TOKEN);
        
        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "1003462", //ID do Model de Communities criado pelo Dato
            // ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/omariosouto.png",
            // creatorSlug: "omariosouto"
        })
    
        console.log(registroCriado);
    
        response.json({
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
  }//