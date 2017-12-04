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
  // colors: ColorSet,
  // locale: string,
  options: Array<{value: string}>,
    // array of options, value is saved to the profile object and used as translation key
  choiceKey: string, // choices are saved in the profile object with this key as the property name
  ns: string,
  t: string => string,
  i18n: any,
};
type OptionsArray = Array<string>;
type State = {
  selectedOptions: OptionsArray,
};

let styles;

/*
 An onboarding step component where the user can select one option from many
 */
class MultiChoiceStep extends React.Component<Props, State> {
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

  tWithNamespace = (key: string): string => {
    const { t, ns } = this.props;
    return t(`${ns}:${key}`);
  }

  render() {
    const { options } = this.props;
    const { selectedOptions } = this.state;
    const t = this.tWithNamespace;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>{t('title')}</Text>
          <Text style={styles.question}>{t('question')}</Text>
          <View style={styles.buttonContainer}>
            { options.map(option => (
              <View key={option.value} style={styles.buttonWrapper}>
                <OptionButton
                  label={t(`options.${option.value}`)}
                  onPress={() => this.toggle(option.value)}
                  selected={selectedOptions.includes(option.value)}
                  style={styles.button}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <StepBottomBar
          t={this.props.t}
          i18n={this.props.i18n}
          onPreviousPress={this.handlePreviousPress}
          onNextPress={this.handleNextPress}
          nextDisabled={false}
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  buttonWrapper: {
    width: '46%',
    margin: '2%',
  },
  button: {
    aspectRatio: 1,
  },
});

export default MultiChoiceStep;
