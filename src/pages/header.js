import Logo from '../assets/eagle.jpg';


export default function Header() {
    return (
      <>
        <div className='h-card-header h-w-full h-flex h-flex-row h-items-center'>
          <img className='h-ml-4 h-p-2' src={Logo} width={30}></img>
          <div className='h-p-2 h-text-xl'>
            Albatros
          </div>
          
        </div>
      </>
    );
  }