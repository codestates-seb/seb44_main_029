import { setIsModal } from '../feature/header/modalSlice';
import { useDispatch } from 'react-redux';

// 이전 유틸 버전 -> 훅 호출 규칙 떼문에 사용 불가.
// export function showLoginForm() {
//   const dispatch = useDispatch();
//   dispatch(setIsModal(true)); // 로그인 폼을 표시하는 액션 디스패치
// }

// 커스텀 훅 버전 사용법
// 1. 가져오기: import { useShowLoginForm } from '나의 경로/hooks/useShowLoginForm';
// 2. 선언하기: const showLoginForm = useShowLoginForm();
// 3. 호출하기: showLoginForm()
export function useShowLoginForm() {
  const dispatch = useDispatch();
  const showLoginForm = () => {
    dispatch(setIsModal(true)); // 로그인 폼을 표시하는 액션 디스패치
  };
  return showLoginForm;
}
