import Link from 'next/link';

function NavCard(props){
  return (
    <div>
      <img className={`${!props.linkHref ? 'disabled' : ''}`} src={props.imgSrc} />

      <Link href={props.linkHref}>
        <a className={`${!props.linkHref ? 'disabled' : ''}`}>
          {props.caption}
        </a>
      </Link>

      <style jsx>{`
        div {
          display: inline-flex;
          flex-direction: column;
          margin: 20px;
          padding: 20px 0px;
          background-color: #EEE;
        }

        div img {
          height: 60%;
          width: 60%;
          margin: 0 auto;
          margin-bottom: 20px;
        }

        div img.disabled {
          filter: grayscale(1);
        }

        div a {
          font-weight: bold;
          text-decoration: none;
          color: #555;
        }

        div a:hover {
          color: #6669c9;
        }

        div a.disabled {
          cursor: default;
        }

        div a.disabled:hover {
          color: #555;
        }
      `}</style>
    </div>
  )
}

export default NavCard;
