import fetch from 'node-fetch';
//const apiUrl = 'https://dev-dash.vrbangers.com/api?value=https://vrbangers.com/&date_start=2022-03-20&date_end=2022-03-25'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const params = {...body}

  const data = {
    error: null,
    message: "",
    video: null
  };

  function setData(err, mess, video) {
    data.error = err;
    data.message = mess;
    data.video = video
  }

  var projectUrl = '';
  switch (params.project) {
    case 'VRBANGERS':
      projectUrl = 'https://vrbangers.com/';
      break;
    case 'VRBTRANS':
      projectUrl = 'https://vrbtrans.com/';
      break;
    case 'VRBGAY':
      projectUrl = 'https://vrbgay.com/';
      break;
    case 'VRCONK':
      projectUrl = 'https://vrconk.com/';
      break;
    case 'BLOWVR':
      projectUrl = 'https://blowvr.com/';
      break;
  }

  const apiUrl = 'https://dev-dash.vrbangers.com/api' + 
    '?value=' + projectUrl + 
    '&date_start=' + params.date_start + 
    '&date_end=' + params.date_end;
    
  const response = await fetch(apiUrl);
  const json = await response.json();

  if (json) {
    setData(0, "Данные получены.", json);
    return { data }

  } else {
    setData(1, "Нет данных!", null);
    return { data }
  }

});