import { setIsModal } from '../feature/header/modalSlice';
import { useDispatch } from 'react-redux';

// 이전 유틸 버전 -> 훅 호출 규칙 떼문에 사용 불가.
// export function showLoginForm() {
//   const dispatch = useDispatch();
//   dispatch(setIsModal(true)); // 로그인 폼을 표시하는 액션 디스패치
// }

// 커스텀 훅 버전
export function useShowLoginForm() {
  const dispatch = useDispatch();
  const showLoginForm = () => {
    dispatch(setIsModal(true)); // 로그인 폼을 표시하는 액션 디스패치
  };
  return showLoginForm;
}
