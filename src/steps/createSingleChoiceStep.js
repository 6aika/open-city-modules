/* @flow */
import * as React from 'react';
import { cloneDeep } from 'lodash';
import { type Profile } from 'open-city-modules/src/types';

type Props = {
  next: Profile => void,
  previous: Profile => void,
  profile: Profile,
  step: number,
  totalSteps: number,
  // colors: any,
  // locale: string,
  options: Array<{value: string}>,
  choiceKey: string,
  t: string => string,
  i18n: any,
};

type State = {
  selectedOption: ?string,
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
    i18n: any
*/
const createSingleChoiceStep = (
  ViewComponent: React.ComponentType<any>,
  onNextPress?: Profile => void,
) =>
  class SingleChoiceStep extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);

      const selectedOption = props.profile[props.choiceKey] || null;
      if (typeof selectedOption === 'string') {
        this.state = {
          selectedOption,
        };
      } else {
        this.state = {
          selectedOption: null,
        };
      }
    }

    select = (option: string) => {
      this.setState({ selectedOption: option });
      const newProfile: Profile = cloneDeep(this.props.profile);
      newProfile[this.props.choiceKey] = this.state.selectedOption;
      if (onNextPress) {
        onNextPress(newProfile);
      }
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
      const { selectedOption } = this.state;
      const optionsWithSelected = options.map(option => ({
        value: option.value,
        selected: selectedOption === option.value,
      }));
      return (
        <ViewComponent
          options={optionsWithSelected}
          onOptionPress={this.select}
          onPreviousPress={this.handlePreviousPress}
          onNextPress={() => null}
          nextDisabled
          step={step}
          totalSteps={totalSteps}
          t={t}
          i18n={i18n}
        />
      );
    }
  };

export default createSingleChoiceStep;
