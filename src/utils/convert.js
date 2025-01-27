import { ACTION_CREATE, ACTION_NONE, TYPE_IMAGE } from './constantValue';

function changeKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
  return obj;
}

function deleteKey(obj, targetKey) {
  delete obj[targetKey];
  return obj;
}

// [image] -> widget_type: 1
// 이미지위젯
// widget_data: {
// thumbnail: "string"
// url: "string",
// }

// 아직 서버에서 구현안됨
// [video]
// 동영상위젯 -> widget_type: 2
// widget_data: {
// thumbnail: "string"
// }

// 프론트에서 수정한 데이터를 다시 서버용으로 바꿔줌
export function convertForServer(infos) {
  const converted = JSON.parse(JSON.stringify(infos));
  console.log('=======infos======');
  console.log(infos);
  converted.map(function (info, index) {
    changeKey(info, 'x', 'pos_x');
    changeKey(info, 'y', 'pos_y');
    changeKey(info, 'w', 'width');
    changeKey(info, 'h', 'height');
    deleteKey(info, 'i');
    if (info.widget_action === ACTION_CREATE) {
      info.widget_code = '';
    }
    if (info.widget_action === ACTION_NONE) {
      deleteKey(info, 'widget_action');
    }
    // 서버랑 맞추고 나서 지울 부분
    // info.widget_data.thumbnail = info.widget_data.url;
    // info.widget_data.url = 'https://humonnom.tistory.com/';
    // 클릭시 이동할 링크
    //

    console.log('=========info=========');
    console.log(info);
    return info;
  });
  return converted;
}

function createIdKey(obj, index) {
  // obj.i = obj.widget_code.replace(/^\D+/g, ''); // or using index;
  obj.i = index.toString();
  return obj;
}
// TODO: server랑 widget_data 구조 맞추기 -> 나중에 수정하기
//      - frontend: widget_data.url
//      - backend: widget_data
//      - widget_type 누락됨
// {
//   widget_data: "http://!~~"
// }
// 서버에서 받아온 데이터를 프론트에서 쓸 수 있게 수정해줌
export function convertForRedux(infos) {
  console.log('=======infos======');
  console.log(infos);
  // TODO: infos가 없으면 처리해야됨
  const converted = JSON.parse(JSON.stringify(infos));
  converted.map(function (info, index) {
    changeKey(info, 'pos_x', 'x');
    changeKey(info, 'pos_y', 'y');
    changeKey(info, 'width', 'w');
    changeKey(info, 'height', 'h');
    createIdKey(info, index);
    info.widget_action = ACTION_NONE;
    // TODO: 서버랑 맞추고 나서 지울 부분
    // info.widget_data.url = info.widget_data.thumbnail;
    // info.widget_type = TYPE_IMAGE;
    //--------------------------------
    console.log('=========info=========');
    console.log(info);
    return info;
  });
  return converted;
}
// export function convertForRedux(infos) {
//   return infos.map(function (info) {
//     const newInfo = {
//       x: info.pos_x,
//       y: info.pos_y,
//       w: info.width,
//       h: info.height,
//       i: info.widget_code,
//       widget_action: info.widget_action,
//       widget_type: info.widget_type,
//       widget_data: info.widget_data,
//     };
//     return newInfo;
//   });
// }
