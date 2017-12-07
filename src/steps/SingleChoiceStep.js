/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { cloneDeep } from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';

import OptionButton from 'open-city-modules/steps/components/OptionButton';
import StepBottomBar from 'open-city-modules/steps/components/StepBottomBar';

type Profile = {[string]: mixed};

type Props = {
  next: Profile => void, // provided by Onboarding
  previous: Profile => void, // provided by Onboarding
  profile: Profile, // provided by Onboarding
  // step: number,
  // totalSteps: number,
  // colors: any,
  // locale: string,
  options: Array<{value: string}>,
    // array of options, value is saved to the profile object and used as translation key
  choiceKey: string, // choice is saved in the profile object with this key as the property name
  ns: string,
  t: string => string,
  i18n: any,
};

type State = {
  selectedOption: ?string,
};

let styles;

/*
 An onboarding step component where the user can select one option from many
 */
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
  }

  handleNextPress = () => {
    const newProfile: Profile = cloneDeep(this.props.profile);
    newProfile[this.props.choiceKey] = this.state.selectedOption;
    this.props.next(newProfile);
  }

  handlePreviousPress = () => {
    const newProfile: Profile = cloneDeep(this.props.profile);
    delete newProfile[this.props.choiceKey];
    this.props.previous(newProfile);
  }

  tWithNamespace = (key: string): string => {
    const { t, ns } = this.props;
    return t(`${ns}:${key}`);
  }

  render() {
    const { options } = this.props;
    const { selectedOption } = this.state;
    const t = this.tWithNamespace;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>{t('title')}</Text>
          <Text style={styles.question}>{t('question')}</Text>
          { options.map(option => (
            <OptionButton
              key={option.value}
              label={t(`options.${option.value}`)}
              onPress={() => this.select(option.value)}
              selected={selectedOption === option.value}
              style={styles.button}
            />
          ))}
        </ScrollView>
        <StepBottomBar
          t={this.props.t}
          i18n={this.props.i18n}
          onPreviousPress={this.handlePreviousPress}
          onNextPress={this.handleNextPress}
          nextDisabled={!selectedOption}
        />
      </View>
    );
  }
}

styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '$colors.min',
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '$colors.max',
    textAlign: 'center',
    marginVertical: 20,
  },
  question: {
    fontSize: 20,
    color: '$colors.max',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default SingleChoiceStep;
