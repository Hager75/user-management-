import { ModalType } from '../../core/enums/shared.enum';

const USER_MODAL = {
  [ModalType.DELETE]: {
    type: ModalType.DELETE,
    confirmBtnTxt: 'Yes',
    cancelBtnTxt: 'Cancel',
    title: 'Delete User',
  },
  [ModalType.ADD]: {
    type: ModalType.ADD,
    confirmBtnTxt: 'Save',
    cancelBtnTxt: 'Cancel',
    title: 'Add User',
  },
  [ModalType.EDIT]: {
    type: ModalType.EDIT,
    confirmBtnTxt: 'Save',
    cancelBtnTxt: 'Cancel',
    title: 'Edit User',
  },
};

export const getModal = (type: ModalType) => {
  return USER_MODAL[type];
};
