'use client';

import ConfirmationModal from '../common/components/modals/ConfirmationModal/ConfirmationModal';
import FailureModal from '../common/components/modals/FailureModal/FailureModal';
import Heading from '../common/components/text/Heading/Heading';
import React, { useCallback, useState } from 'react';
import { SubmitState, SubmitForm } from './types/submitMusicFormTypes';
import { createMusicSubmissionFormData } from './utils/helpers/formHelpers';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '../common/constants/i18nConstants';
import { SUBMIT_URI } from './constants/apiConstants';
import LoadingModal from '../common/components/modals/LoadingModal/LoadingModal';
import fetchService from '../common/config/FetchService';
import UserContextProvider from '../common/context/user/UserContextProvider';
import UserProfile from './components/UserProfile/UserProfile';
import SongSubmissionForm from './components/SongSubmissionForm/SongSubmissionForm';
import styles from './SubmitPage.module.scss';

const initState = {
  formInProgress: null,
  inProgress: false,
  showConfirmationModal: false,
  showFailureModal: false,
  showForm: false
};

export default function SubmitPage() {
  const [state, setState] = useState<SubmitState>(initState);
  const { t } = useTranslation(Namespaces.SUBMIT);
  const resetState = () => setState(initState);

  const handleSubmit = useCallback(async (form: SubmitForm) => {
    setState({ ...state, inProgress: false });
    const formData = createMusicSubmissionFormData(form);
    try {
      await fetchService.POST(SUBMIT_URI, formData);
      setState({ ...state, formInProgress: form, showConfirmationModal: true });
    } catch (e) {
      setState({ ...state, formInProgress: form, showFailureModal: true });
    }
  }, [state]);

  const handleRetry = useCallback(() => {
    setState({ ...state, showFailureModal: false, inProgress: true });
    if (state.formInProgress) handleSubmit(state.formInProgress);
  }, [state, handleSubmit]);

  return (
    <main className={styles.mainContainer}>
      <LoadingModal showModal={state.inProgress} />
      <ConfirmationModal message={t('confirmationMessage')} onConfirm={resetState} showModal={state.showConfirmationModal} />
      <FailureModal message={t('failureMessage')} showModal={state.showFailureModal} onCancel={resetState} onRetry={handleRetry} />
      <div className={styles.innerPanelContainer}>
        <Heading size="3xl" text={t('submitHeading')} additionalStyles={styles.pageHeading} />
        <UserContextProvider>
          <UserProfile />
        </UserContextProvider>
        <SongSubmissionForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
