import React from 'react'
import nookies from  'nookies'
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
//import IndexPage from '../src/components/IndexPage'
import PostBox from '../src/components/PostBox';
import CustomizedInput from '../src/components/CustomizedInput';

import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet
} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`} target="_blank" >
          @{props.githubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.total})</h2>

      <ul>
        {props.items.slice(0, 12).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.html_url} target="_blank" rel="noopener noreferrer" title="Usuario do Github">
                <img src={itemAtual.avatar_url} alt="Avatar do usuário" />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <hr />
      <p>
        <a className="boxLink" href={`/githubFriends`} >
          Ver todos
        </a>
      </p>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
  
  const [comunidades, setComunidades] = React.useState([]);
 
  const [seguindo, setSeguindo] = React.useState([]);
    // SEGUIDORES 

  const [seguidores, setSeguidores ] = React.useState([]);
  //SEGUIDOS

  const [numerosSegui, setNumerosSegui] = React.useState([]);
 // NUMEROS SEGUIDORES-SEGUINDO

  // POST
  const [posts, setPosts] = React.useState([]);
  // NOME POST
  const [nameValue, setNameValue] = React.useState('');
  // TEXTO POST
  const [textValue, setTextValue] = React.useState('');

  React.useEffect(function() {

 
            // GET

    const urlFollowing = `https://api.github.com/users/${usuarioAleatorio}/following`
    fetch(urlFollowing)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguindo(respostaCompleta);
      }) 
    

      // API GraphQL
      fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '576bd961874946cbd306f6e3227e61',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
     body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })

     // API DATOCMS GraphQL Post
     // API GraphQL
     
      // API GraphQL
      fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '576bd961874946cbd306f6e3227e61',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
     body: JSON.stringify({ "query": `query {
        allPosts {
          id 
          name
          text
        }
      }` })
    })
      .then((resposta) => resposta.json())
     // .then((respostaCompleta) => {
     //   const postVindosDoDato = respostaCompleta.data.allPosts;
        // console.log(postVindosDoDato);
       // setPosts(postVindosDoDato);
     // })
  }, [])

 // 1 - Criar um box que vai ter um map, baseado nos items do array
 // que pegamos do GitHub


  return (
    <>
      <AlurakutMenu />
      <MainGrid>      
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={usuarioAleatorio} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 clasname="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image'));

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: usuarioAleatorio,
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>

          <Box>
            <h2 className="subTitle">Deixe seu comentario</h2>
            <form onSubmit={function handleCriaPost(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const post = {
                name: dadosDoForm.get('name'),
                text: dadosDoForm.get('text'),
              }
              fetch('/api/post', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(post),
              })
                .then(async (response) => {
                  const dadosPost = await response.json();
                  // console.log(dados.registroCriado);
                  const post = dadosPost.registroCriado;
                  const postAtualizados = [post, ...posts]
                  setPosts(postAtualizados);
                  setNameValue('');
                  setTextValue('');
                })
            }}>
              <div>
                <CustomizedInput
                  placeholder="Usuário Github"
                  name="name"
                  aria-label="Usuário Github"
                  value={nameValue}
                  onValueChange={setNameValue}
                />
              </div>
              <div>
                <CustomizedInput
                  placeholder="Deixe seu comentario"
                  name="text"
                  aria-label="Deixe seu comentario"
                  value={textValue}
                  onValueChange={setTextValue}
                />
              </div>
            
              <button type="submit" aria-label="Criar comentario" style={{ background: '#2E7BB4' }} >
                Criar comentario
              </button>
            </form>
          </Box>

          <PostBox>
            <h2 className="smallTitle">Comentarios ({posts.length})</h2>

            <ul>
              {posts.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`https://github.com/${itemAtual.name}`} target="_blank" rel="noopener noreferrer" title="Site do usuário">
                      <img src={`https://github.com/${itemAtual.name}.png`} alt="Foto usuário" />
                    </a>
                    <div style={{ flexGrow: '2' }}>
                      <span>@{itemAtual.name}</span>
                      <p>{itemAtual.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </PostBox>

        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0,6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>  
 
          <ProfileRelationsBox title="Quem eu sigo" items={seguindo} total={seguindo.lenght} />
          
          <ProfileRelationsBox title="Meus seguidores" items={seguidores} total={seguidores.lenght} />


        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;

  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      githubUser,
    }
  }
}