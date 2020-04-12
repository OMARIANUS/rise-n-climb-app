import Head from 'next/head';

function Layout(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <span>R</span>
      </header>

      {props.children}

      <style jsx global>{`
        /* Just to be clear, react-datepicker next/prev buttons have !important :) */

        * { font-family: 'Montserrat', sans-serif; }

        html, body {
          margin: 0 auto;
          box-sizing: border-box;
        }

        header {
          padding: 10px;
          text-align: center;
          background-color: #6669c9;
        }

        header span {
          color: white;
          font-size: 2rem;
        }

        body {
          text-align: center;
        }

        span.special {
          font-size: 1rem;
        }

        span.status-completed {
          color: limegreen;
        }

        span.status-progress {
          color: purple;
        }

        p { color: #444; }

        button {
          margin: 10px;
          padding: 15px;
          border: 1px solid #6669c9;
          background-color: white;
        }

        button:not(:disabled):hover {
          color: white;
          background-color: #6669c9;
          cursor: pointer;
        }

        .rd-corrector {
          width: 88%;
          padding: 10px;
          border: 1px solid silver;
          border-radius: 5px;
        }

        .goal-view {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
        }

        .goal-view .goal-entry {
          border: 1px solid silver;
          width: 340px;
          margin: 20px;
          padding: 25px;
          text-align: left;
        }

        .goal-short-info-1 p {
          margin-bottom: 30px;
        }

        .goal-short-info-2 {
          display: flex;
          flex-direction: row;
        }

        .goal-short-info-2 div:nth-of-type(1) p, span {
          font-size: .9rem;
        }

        .goal-short-info-2 div:nth-of-type(1) p:first-child {
          color: gray;
          font-weight: bold;
        }

        .goal-short-info-2 button {
          width: 100px;
          padding: 5px;
          border: none;
          color: white;
          background-color: cornflowerblue;
        }

        .goal-short-info-2 button:hover {
          background-color: #5a8ce8;
        }

        .goal-short-info-2 div:nth-of-type(1) {
          margin-right: auto;
        }

        .goal-short-info-2 div:nth-of-type(2) {
          align-self: center;
        }
      `}</style>
    </>
  );
}

export default Layout;
