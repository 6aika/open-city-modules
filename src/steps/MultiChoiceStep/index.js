/* @flow */
import * as React from 'react';
import { cloneDeep } from 'lodash';

import MultiChoiceView from './MultiChoiceView';

type Profile = {[string]: mixed};

type Props = {
  next: Profile => void,
  previous: Profile => void,
  profile: Profile,
  step: number,
  totalSteps: number,
  // colors: ColorSet,
  // locale: string,
  options: Array<{value: string}>,
  choiceKey: string,
  t: string => string,
  i18n: any,
};

type State = {
  selectedOptions: Array<string>,
};

/*
  A HoC that receives a component that implements the UI, and provides it with
  the following props:
    options: Array<{value: string, selected: boolean}>,
    onOptionPress: (string) => void,
    onPreviousPress: () => void,
    onNextPress: () => void,
    nextDisabled: boolean,
    step: number,
    totalSteps: number,
    t: any,
    i18n: any,
*/
const createMultiChoiceStep = (ViewComponent: React.ComponentType<any>) =>
  class extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);

      const selectedOptions = props.profile[props.choiceKey];
      if (Array.isArray(selectedOptions)) {
        // Refine selectedOptions into an Array<string>
        const initialOptions =
          selectedOptions.reduce((acc: Array<string>, option) => {
            if (typeof option === 'string') {
              return [...acc, option];
            }
            return acc;
          }, []);
        this.state = {
          selectedOptions: initialOptions,
        };
      } else {
        this.state = {
          selectedOptions: [],
        };
      }
    }

    toggle = (option: string) => {
      this.setState((prevState) => {
        let newOptions;
        const prevOptions = prevState.selectedOptions;
        if (prevOptions.includes(option)) {
          newOptions = prevOptions.filter(o => o !== option);
        } else {
          newOptions = [...prevOptions, option];
        }
        return {
          selectedOptions: newOptions,
        };
      });
    }

    handleNextPress = () => {
      const newProfile: Profile = cloneDeep(this.props.profile);
      newProfile[this.props.choiceKey] = this.state.selectedOptions;
      this.props.next(newProfile);
    }

    handlePreviousPress = () => {
      const newProfile: Profile = cloneDeep(this.props.profile);
      delete newProfile[this.props.choiceKey];
      this.props.previous(newProfile);
    }

    render() {
      const {
        options, step, totalSteps, t, i18n,
      } = this.props;
      const { selectedOptions } = this.state;
      const optionsWithSelected = options.map(option => ({
        value: option.value,
        selected: selectedOptions.includes(option.value),
      }));
      return (
        <ViewComponent
          options={optionsWithSelected}
          onOptionPress={this.toggle}
          onPreviousPress={this.handlePreviousPress}
          onNextPress={this.handleNextPress}
          nextDisabled={false}
          step={step}
          totalSteps={totalSteps}
          t={t}
          i18n={i18n}
        />
      );
    }
  };

export { createMultiChoiceStep as default, MultiChoiceView };
