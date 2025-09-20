'use client'

import FormInput from '@/common/components/formElements/FormInput';
import Heading from '@/common/components/text/Heading';
import Label from '@/common/components/text/Label';
import { UNRECOGNIZED_FIELD_MESSAGE } from '@/common/constants/constants';
import { UserContext } from '@/common/context/user/UserContextProvider';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import UsersApi from '@/apis/UsersApi';
import { Namespaces } from '@/common/constants/i18nConstants';
import { useTranslation } from 'react-i18next';

interface UserProfileState {
    disabled: boolean;
    saving: boolean;
    initialFirstName: string;
    initialLastName: string;
    firstName: string;
    lastName: string;
    editButtonText: string;
}

export const UserProfile: React.FC = () => {
    const { t } = useTranslation(Namespaces.SUBMIT);
    const user = useContext(UserContext);
    const [state, setState] = useState<UserProfileState>({
        disabled: true,
        saving: false,
        initialFirstName: user.firstName ?? '',
        initialLastName: user.lastName ?? '',
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        editButtonText: 'Edit'
    })
    const handleInputChange = useCallback(
        (name: string, text: string) => {
          switch (name) {
            case 'firstName':
              setState({ ...state, firstName: text });
              break;
            case 'lastName':
              setState({ ...state, lastName: text });
              break;
            default:
              console.log(UNRECOGNIZED_FIELD_MESSAGE);
          }
        },
        [state]
      );

    const isSaveHidden = useMemo(() => `${state.initialFirstName}${state.initialLastName}` === `${state.firstName}${state.lastName}`, [state])
    
    const toggleDisabledState = useCallback(() => {
      if (state.disabled) setState({ ...state, disabled: false, editButtonText: t('cancelButton') });
      if (!state.disabled) setState({ ...state, firstName: state.initialFirstName, lastName: state.initialLastName, disabled: true, editButtonText: t('editButton') })
    }, [state])

    useEffect(() => {
      if (user.userId && (!state.firstName || !state.lastName)) {
        var firstName = !state.firstName && user.firstName ? user.firstName : state.firstName;
        var lastName = !state.lastName && user.lastName ? user.lastName : state.lastName;
        setState({ ...state, initialFirstName: firstName, initialLastName: lastName, firstName, lastName })
      }
    }, [user])

    const saveChanges = useCallback(async () => {
      if (user.userId) {
        setState({ ...state, saving: true });
        await UsersApi.updateUserName(user.userId, state.firstName, state.lastName);
        setState({ ...state, initialFirstName: state.firstName, initialLastName: state.lastName, saving: false, disabled: true, editButtonText: 'Edit' });
      }
    }, [state, user])

    return (
        <div className='w-full'>
            <Heading size='xl' text={t('submissionProfileHeading')} additionalStyles='mb-2'/>
            <form>
                <FormInput name='firstName' label={t('firstName')} value={state.firstName} onChange={handleInputChange} disabled={state.disabled}/>
                <FormInput name='lastName' label={t('lastName')} value={state.lastName} onChange={handleInputChange} disabled={state.disabled}/>
            </form>
            <div className='w-full flex justify-end'>
              <button onClick={toggleDisabledState} className='w-16 h-10 border-2 border-wbBlue rounded-2xl shadow-blue m-1'><Label bold text={state.editButtonText} /> </button>
              <button onClick={saveChanges} disabled={state.saving} hidden={isSaveHidden} className='w-16 h-10 border-2 border-wbPink rounded-2xl shadow-pink m-1'><Label bold text={t('saveButton')} /></button>
            </div>
        </div>
    )
}

export default UserProfile;