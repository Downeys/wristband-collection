'use client';

import ConfirmationModal from '@/common/components/modals/ConfirmationModal';
import FailureModal from '@/common/components/modals/FailureModal';
import Heading from '@/common/components/text/Heading';
import React, { useCallback, useState } from 'react';
import { SubmitState, SubmitForm } from '@/Submit/types/submitMusicFormTypes';
import { createMusicSubmissionFormData } from '@/Submit/utils/helpers/formHelpers';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/common/constants/i18nConstants';
import { SUBMIT_URI } from './constants/apiConstants';
import LoadingModal from '@/common/components/modals/LoadingModal';
import fetchService from '@/common/config/FetchService';
import UserContextProvider from '@/common/context/user/UserContextProvider';
import UserProfile from './components/UserProfile/UserProfile';
import SongSubmissionForm from './components/SongSubmissionForm/SongSubmissionForm';

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
    setState({ ...state, inProgress: true });
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
    <main className="flex min-w-screen min-h-screen flex-col items-center px-8 pt-4 bg-slate-950 relative top-20 z-0">
      <LoadingModal showModal={state.inProgress} />
      <ConfirmationModal message={t('confirmationMessage')} onConfirm={resetState} showModal={state.showConfirmationModal} />
      <FailureModal message={t('failureMessage')} showModal={state.showFailureModal} onCancel={resetState} onRetry={handleRetry} />
      <div className="w-full max-w-screen-sm">
        <Heading size="3xl" text={t('submitHeading')} additionalStyles="w-full text-center p-2" />
        <UserContextProvider>
          <UserProfile />
        </UserContextProvider>
        <SongSubmissionForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
