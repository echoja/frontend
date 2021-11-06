import React from 'react';
import { useSelector } from 'react-redux';
import {
  PageWrapper,
  EditWrapper,
  ToolBar,
  EditModeGrid,
  EditImage,
} from '../components';
import PopWidgets from '../components/Widgets/PopWidgets';

function EditMode(props) {
  const { modal } = useSelector((state) => ({
    modal: state.info.modal,
  }));

  return (
    <PageWrapper>
      <EditWrapper>
        {modal.imgInputWindow && <EditImage />}
        <ToolBar />
        {modal.popUpWindow && <PopWidgets />}
        <EditModeGrid />
      </EditWrapper>
    </PageWrapper>
  );
}

export default EditMode;
