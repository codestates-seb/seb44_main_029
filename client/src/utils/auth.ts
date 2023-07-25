import { redirect } from 'react-router-dom';

export function checkToken() {
  const accessToken = sessionStorage.getItem('accessToken');

  if (!accessToken || accessToken === 'undefined') {
    alert('로그인이 필요한 기능입니다. 🙏');
    return redirect('/');
  }
  return null;
}
