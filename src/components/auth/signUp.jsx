/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import * as React from 'react';

import { I18n, ConsoleLogger as Logger } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { usersPath } from 'utils/apiPaths'
// import { fetchJSON } from 'utils'

import AuthPiece from 'aws-amplify-react/dist/Auth/AuthPiece';
import {
    FormSection,
    SectionHeader,
    SectionBody,
    SectionFooter,
    FormField,
    Input,
    InputLabel,
    SelectInput,
    Button,
    Link,
    SectionFooterPrimaryContent,
    SectionFooterSecondaryContent,
} from 'aws-amplify-react/dist/Amplify-UI/Amplify-UI-Components-React';

import countryDialCodes from 'aws-amplify-react/dist/Auth/common/country-dial-codes.js';
// import { valid } from 'semver';

const logger = new Logger('SignUp');


export default class SignUp extends AuthPiece {
    constructor(props) {
        super(props);

        this._validAuthStates = ['signUp'];
        this.signUp = this.signUp.bind(this);
        this.sortFields = this.sortFields.bind(this);
        this.getDefaultDialCode = this.getDefaultDialCode.bind(this);
        this.checkCustomSignUpFields = this.checkCustomSignUpFields.bind(this);
        this.defaultSignUpFields =
          [
            {
              label: 'Email',
              key: 'username',
              required: true,
              placeholder: 'Email',
              displayOrder: 1,
            },
            {
              label: 'Password',
              key: 'password',
              required: true,
              placeholder: 'Password',
              type: 'password',
              displayOrder: 2,
            },
            {
              label: 'First Name',
              key: 'name',
              required: true,
              placeholder: 'First Name',
              displayOrder: 3,
            },
            {
              label: 'Last Name',
              key: 'family_name',
              required: true,
              placeholder: 'Last Name',
              displayOrder: 4,
            },
            {
              label: 'Phone Number',
              key: 'phone_number',
              placeholder: 'Phone Number',
              required: false,
              displayOrder: 5
            }
          ];
        this.needPrefix = this.needPrefix.bind(this);
        this.header = (this.props &&
            this.props.signUpConfig &&
            this.props.signUpConfig.header) ? this.props.signUpConfig.header : 'Create a new account';
    }

    validate() {
        const invalids = [];
        this.signUpFields.forEach((el) => {
          if (el.key !== 'phone_number') {
            if (el.required && !this.inputs[el.key]) {
              el.invalid = true;
              invalids.push(el.label);
            } else {
              el.invalid = false;
            }
          } else {
            if (el.required && (!this.inputs.dial_code || !this.inputs.phone_line_number)) {
              el.invalid = true;
              invalids.push(el.label);
            } else {
              el.invalid = false;
            }
          }
        });
        return invalids;
    }

    sortFields() {

        if (this.props.signUpConfig && this.props.signUpConfig.hiddenDefaults && this.props.signUpConfig.hiddenDefaults.length > 0){
            this.defaultSignUpFields = this.defaultSignUpFields.filter((d) => {
              return !this.props.signUpConfig.hiddenDefaults.includes(d.key);
            });
        }

        if (this.checkCustomSignUpFields()) {

          if (!this.props.signUpConfig || !this.props.signUpConfig.hideAllDefaults) {
            // see if fields passed to component should override defaults
            this.defaultSignUpFields.forEach((f, i) => {
              const matchKey = this.signUpFields.findIndex((d) => {
                return d.key === f.key;
              });
              if (matchKey === -1) {
                this.signUpFields.push(f);
              }
            });
          }

          /*
            sort fields based on following rules:
            1. Fields with displayOrder are sorted before those without displayOrder
            2. Fields with conflicting displayOrder are sorted alphabetically by key
            3. Fields without displayOrder are sorted alphabetically by key
          */
          this.signUpFields.sort((a, b) => {
            if (a.displayOrder && b.displayOrder) {
              if (a.displayOrder < b.displayOrder) {
                return -1;
              } else if (a.displayOrder > b.displayOrder) {
                return 1;
              } else {
                if (a.key < b.key) {
                  return -1;
                } else {
                  return 1;
                }
              }
            } else if (!a.displayOrder && b.displayOrder) {
              return 1;
            } else if (a.displayOrder && !b.displayOrder) {
              return -1;
            } else if (!a.displayOrder && !b.displayOrder) {
              if (a.key < b.key) {
                return -1;
              } else {
                return 1;
              }
            }else{
              return 1;
            }
          });
        } else {
          this.signUpFields = this.defaultSignUpFields;
        }
    }

    needPrefix(key) {
        const field = this.signUpFields.find(e => e.key === key);
        if (key.indexOf('custom:') !== 0) {
          return field.custom ;
        } else if (key.indexOf('custom:') === 0 && field.custom === false) {
            logger.warn('Custom prefix prepended to key but custom field flag is set to false; retaining manually entered prefix');

        }
        return null;
    }


    getDefaultDialCode() {
        return this.props.signUpConfig &&
        this.props.signUpConfig.defaultCountryCode  &&
        countryDialCodes.indexOf(`+${this.props.signUpConfig.defaultCountryCode}`) !== '-1' ?
        `+${this.props.signUpConfig.defaultCountryCode}` :
        "+1"
    }

    checkCustomSignUpFields() {
        return this.props.signUpConfig &&
        this.props.signUpConfig.signUpFields &&
        this.props.signUpConfig.signUpFields.length > 0
    }

    signUp() {
        if (!this.inputs.dial_code) {
            this.inputs.dial_code = this.getDefaultDialCode();
        }
        const validation = this.validate();
        if (validation && validation.length > 0) {
          return this.error(`The following fields need to be filled out: ${validation.join(', ')}`);
        }
        if (!Auth || typeof Auth.signUp !== 'function') {
            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
        }

        let signup_info = {
            username: this.inputs.username,
            password: this.inputs.password,
            attributes: {

            }
        };

        const inputKeys = Object.keys(this.inputs);
        const inputVals = Object.values(this.inputs);

        inputKeys.forEach((key, index) => {
            if (!['username', 'password', 'checkedValue', 'dial_code'].includes(key)) {
              if (key !== 'phone_line_number' && key !== 'dial_code' && key !== 'error') {
                const newKey = `${this.needPrefix(key) ? 'custom:' : ''}${key}`;
                signup_info.attributes[newKey] = inputVals[index];
              } else if (inputVals[index]) {
                  signup_info.attributes['phone_number'] = `${this.inputs.dial_code}${this.inputs.phone_line_number.replace(/[-()]/g, '')}`
              }
            }
        });


        Auth.signUp(signup_info)
          .then((data) => {
            const user = {
              organizationId: 1,
              cognitoId: data.userSub,
              email: data.user.username,
              firstName: signup_info.attributes.name,
              lastName: signup_info.attributes.family_name,
              phone: signup_info.attributes.phone_number
            }
            fetch(usersPath(1), {
              method: 'POST',
              headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
              },
              body: JSON.stringify({user})
            })
            .then(response => response.json())
            .then((apiData) => {
              this.changeState('confirmSignUp', data.user.username)
            })
            .catch(err => this.error(err));
          })
          .catch(err => this.error(err));
    }

    showComponent(theme) {
        const { hide } = this.props;
        if (hide && hide.includes(SignUp)) { return null; }
        if (this.checkCustomSignUpFields()) {
            this.signUpFields = this.props.signUpConfig.signUpFields;
        }
        this.sortFields();
        return (
            <FormSection theme={theme}>
                <SectionHeader theme={theme}>{I18n.get(this.header)}</SectionHeader>
                <SectionBody theme={theme}>
                    {
                        this.signUpFields.map((field) => {
                            return field.key !== 'phone_number' ? (
                                <FormField theme={theme} key={field.key}>
                                {
                                    field.required ?
                                    <InputLabel theme={theme}>{I18n.get(field.label)} *</InputLabel> :
                                    <InputLabel theme={theme}>{I18n.get(field.label)}</InputLabel>
                                }
                                    <Input
                                        autoFocus={
                                            this.signUpFields.findIndex((f) => {
                                                return f.key === field.key
                                            }) === 0 ? true : false
                                        }
                                        placeholder={I18n.get(field.placeholder)}
                                        theme={theme}
                                        type={field.type}
                                        name={field.key}
                                        key={field.key}
                                        onChange={this.handleInputChange}
                                    />
                                </FormField>
                            ) : (
                                <FormField theme={theme} key="phone_number">
                                    {
                                        field.required ?
                                        <InputLabel theme={theme}>{I18n.get(field.label)} *</InputLabel> :
                                        <InputLabel theme={theme}>{I18n.get(field.label)}</InputLabel>
                                    }
                                    <SelectInput theme={theme}>
                                        <select name="dial_code" defaultValue={this.getDefaultDialCode()}
                                        onChange={this.handleInputChange}>
                                            {countryDialCodes.map(dialCode =>
                                                <option key={dialCode} value={dialCode}>
                                                    {dialCode}
                                                </option>
                                            )}
                                        </select>
                                        <Input
                                            placeholder={I18n.get(field.placeholder)}
                                            theme={theme}
                                            type="tel"
                                            id="phone_line_number"
                                            key="phone_line_number"
                                            name="phone_line_number"
                                            onChange={this.handleInputChange}
                                        />
                                    </SelectInput>
                                </FormField>
                            )
                        })
                    }
                </SectionBody>
                <SectionFooter theme={theme}>
                    <SectionFooterPrimaryContent theme={theme}>
                        <Button onClick={this.signUp} theme={theme}>
                            {I18n.get('Create Account')}
                        </Button>
                    </SectionFooterPrimaryContent>
                    <SectionFooterSecondaryContent theme={theme}>
                        {I18n.get('Have an account? ')}
                        <Link theme={theme} onClick={() => this.changeState('signIn')}>
                            {I18n.get('Sign in')}
                        </Link>
                    </SectionFooterSecondaryContent>
                </SectionFooter>
            </FormSection>
        );
    }

}
