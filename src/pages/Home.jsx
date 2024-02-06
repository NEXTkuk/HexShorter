import React from 'react';
import axios from 'axios';

import { Pagination, Loading } from '../components';

const Home = () => {
  const isMounted = React.useRef(false);
  const [URL, setURL] = React.useState('');
  const [statistic, setStatistic] = React.useState(null);
  const token = localStorage.getItem('access_token');

  const [toggleSort, setToggleSort] = React.useState(false);
  const [sortByShort, setSortByShort] = React.useState(false);
  const [sortByTarget, setSortByTarget] = React.useState(false);
  const [sortByCount, setsortByCount] = React.useState(false);

  const [totalPages, setTotalPages] = React.useState(null);
  const [page, setPage] = React.useState(1);

  const [loading, setLoading] = React.useState(false);

  const getShort = async () => {
    try {
      const { data } = await axios.post(`https://front-test.hex.team/api/squeeze?link=${URL}`, '', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.short) {
        setURL('https://front-test.hex.team/s/' + data.short);
        getStatistic();
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatistic = async () => {
    try {
      setLoading(true);

      // Headers
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // URL OPTIONS
      const URL = 'https://front-test.hex.team/api/statistics';
      const offset = '?offset=' + (page - 1) * 10;
      const limit = '&limit=10';

      const short = sortByShort ? '&order=asc_short' : '&order=desc_short';
      const target = sortByTarget ? '&order=asc_target' : '&order=desc_target';
      const counter = sortByCount ? '&order=asc_counter' : '&order=desc_counter';

      const resulutUrl = toggleSort ? URL + offset + limit + short + target + counter : URL + offset + limit;

      const response = await axios.get(resulutUrl, options);

      // const response = await axios.get(URL + offset + limit, options);

      const edit = response.data.map((obj) => ({
        ...obj,
        short: obj.short && 'https://front-test.hex.team/s/' + obj.short,
      }));

      setTotalPages(response.headers['x-total-count']);
      setStatistic(edit);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onCopy = (e) => {
    return navigator.clipboard.writeText(e.target.innerText);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      getStatistic();
    } else {
      isMounted.current = true;
    }
  }, [page, toggleSort, sortByShort, sortByTarget, sortByCount]);

  if (!statistic) {
    return <Loading />;
  }

  return (
    <>
      <div className='short_page'>
        <h2 className='short_header'>Сокращение cсылок</h2>
        <div className='short_about'>
          <span>На этой странице вы можете сделать из длинной и сложной ссылки простую.</span>
          <br />
          <span>Это может быть удобно для отправки в SMS или там, где размер текстового сообщения ограничен</span>
        </div>

        <div className='short_row' id='shorten_row'>
          <div className='short_input_wrapper'>
            <input
              type='text'
              className='short_input'
              placeholder='Cсылка, которую вы хотите сократить'
              value={URL}
              onChange={(e) => setURL(e.target.value)}
            ></input>

            <div className='short_btns'>
              <button className='copy' onClick={() => navigator.clipboard.writeText(URL)}>
                <span data-text-end='Скопирована' data-text-initial='Скопировать ссылку' className='tooltip'></span>
                <span>
                  <svg
                    xmlSpace='preserve'
                    viewBox='0 0 6.35 6.35'
                    y='0'
                    x='0'
                    height='20'
                    width='20'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    className='clipboard'
                  >
                    <g>
                      <path
                        fill='currentColor'
                        d='M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z'
                      ></path>
                    </g>
                  </svg>
                  <svg
                    xmlSpace='preserve'
                    viewBox='0 0 24 24'
                    y='0'
                    x='0'
                    height='18'
                    width='18'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    className='checkmark'
                  >
                    <g>
                      <path
                        data-original='#000000'
                        fill='currentColor'
                        d='M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z'
                      ></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className='short_btn_wrapper'>
            <button className='btn_short' type='button' onClick={getShort} disabled={URL === ''}>
              <div className='text'>Сократить</div>
            </button>
          </div>
        </div>
      </div>

      <div className='short_info'>
        <div className='short_info_header'>
          <div className='short_title'>Недавно сокращённые ссылки</div>
          <div className='switch_wrapper'>
            <div className='switch_text'>Фильтрация</div>
            <label className='switch'>
              <input type='checkbox' onClick={() => setToggleSort(!toggleSort)} defaultChecked={toggleSort}></input>
              <span className='sheckbox-slider'></span>
            </label>
          </div>
        </div>
        {/* <Table statistic={statistic} pagination={pagination} setPagination={setPagination} /> */}
        <div className={loading ? 'loader_wrapper' : 'loader_wrapper hidden'}>
          <span className='loader'>
            <span className='progress-bar'></span>
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th className='link_id'>ID</th>
              <th
                className={sortByShort ? 'link_short reverse' : 'link_short'}
                onClick={() => setSortByShort(!sortByShort)}
              >
                <b className='text'>Короткая ссылка</b>

                {toggleSort && (
                  <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                      fill='white'
                    ></path>
                  </svg>
                )}
              </th>
              <th
                className={sortByTarget ? 'link_targer reverse' : 'link_targer'}
                onClick={() => setSortByTarget(!sortByTarget)}
              >
                <b className='text'>Исходная ссылка</b>
                {toggleSort && (
                  <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                      fill='white'
                    ></path>
                  </svg>
                )}
              </th>
              <th
                className={sortByCount ? 'link_counter reverse' : 'link_counter'}
                onClick={() => setsortByCount(!sortByCount)}
              >
                <b className='text'>Переходов</b>

                {toggleSort && (
                  <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                      fill='white'
                    ></path>
                  </svg>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {statistic.map((obj) => (
              <tr key={obj.id}>
                <th>{obj.id}</th>
                <td onClick={onCopy}>{obj.short}</td>
                <td onClick={onCopy}>{obj.target}</td>
                <td className='link_counter'>{obj.counter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='pagination_wrapper'>
        <Pagination currentPage={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </>
  );
};

export default Home;
