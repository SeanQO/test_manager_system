import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

let state = {
  uname : "",
  psw: "",
}

let handleChange = e =>{
  switch(e.target.name){
      case "uname": state.uname = e.target.value; 
        break;

      case "psw": state.psw = e.target.value;
  }
}

let handleSubmit = async e => {
  e.preventDefault();
  let config = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json' 
      },
      body: JSON.stringify(state)
  }
  console.log(config);
  let r = await fetch ("http://localhost:3000/api/validate",config)
  let jsonresponse = await r.json();
  console.log("JSON RESPONSE: " + jsonresponse);
  if(jsonresponse.uname != ""){
    Router.redirect('http://localhost:3000/test')
  }
  
}

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>login</title>
        <meta name="description"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
            <div>
                <label>user name:</label>
                <input type="text" id="uname" name="uname" onChange={handleChange}></input>
            </div>
            <div>
                <label>password:</label>
                <input type="text" id="psw" name="psw" onChange={handleChange}></input>
            </div>
            <div>
                  <button type="primary">login</button>
            </div>
            <div>
                <Link href="/register">
                  <a type="primary">register</a>
                </Link>
            </div>
          </form>
      </main>

    </div>
  )

}
