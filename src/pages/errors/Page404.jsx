import page404 from '../../assets/img/errors/page404.png';

const Page404 = () => {
  return (
    <div className='section'>
      <div className='container'>
        <div className='b-404'>
          <div className='top'>
            <img src={page404} alt='404' />
          </div>

          <div className='bottom'>
            <div className='ooops'>Ooops!</div>
            <div className='descr'>Страница которую вы ищете не найдена, возможно вы ошиблись адресом</div>
            <a className='btn btn-back' href='/'>
              <span className='back'>На главную</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
