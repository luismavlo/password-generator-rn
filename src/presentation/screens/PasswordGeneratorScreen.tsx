import { StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { colors } from '../../theme/theme'
import { Formik } from 'formik'
import { useState } from 'react'
import { Button } from '../components/Button'
import * as Yup from 'yup'

const initialValues = {
  passwordLength: '',
  keyword: ''
}

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .positive()
    .required('Length is required'),
  keyword: Yup.string().optional()
})

export const PasswordGeneratorScreen = () => {

  const [password, setPassword] = useState('')

  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)

  const generetePasswordString = (passwordLength: number, keyword: string) =>{
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if(includeUppercase){
      characterList += upperCaseChars
    }
    if(includeLowercase){
      characterList += lowerCaseChars
    }
    if(includeNumbers){                        
      characterList += digitChars
    }
    if(includeSymbols){
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength, keyword);

    setPassword(passwordResult)

  }

  const createPassword = (characters: string, passwordLength: number, keyword: string) =>{
    let result = keyword;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }

    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setIncludeLowercase(true)
    setIncludeUppercase(true)
    setIncludeSymbols(false)
    setIncludeNumbers(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Generator</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={PasswordSchema}
        onSubmit={values => { {
          generetePasswordString(+values.passwordLength, values.keyword)
        }}}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleReset,
          isValid,
          touched,
          errors
        }) => (
          <>
            <View style={styles.input_group}>
              <Text style={styles.label}>Password Length</Text>
              <TextInput
                value={values.passwordLength}
                style={styles.input}
                placeholder='Ex, 10'
                keyboardType='numeric'
                onChangeText={handleChange('passwordLength')}
              />
            </View>
            {
              touched.passwordLength && errors.passwordLength && (
                <Text style={styles.errorText}>
                  {errors.passwordLength}
                </Text>
              )
            }
            <View style={styles.input_group}>
              <Text style={styles.label}>Include lowercase</Text>
              <Switch
                value={includeLowercase}
                onValueChange={setIncludeLowercase}
                trackColor={{ false: colors.trackFalse, true: colors.trackTrue }}
                thumbColor={includeLowercase ? colors.thumbTrue : colors.thumbFalse}
              />
            </View>
            <View style={styles.input_group}>
              <Text style={styles.label}>Include uppercase</Text>
              <Switch
                value={includeUppercase}
                onValueChange={setIncludeUppercase}
                trackColor={{ false: colors.trackFalse, true: colors.trackTrue }}
                thumbColor={includeUppercase ? colors.thumbTrue : colors.thumbFalse}
              />
            </View>
            <View style={styles.input_group}>
              <Text style={styles.label}>Include numbers</Text>
              <Switch
                value={includeNumbers}
                onValueChange={setIncludeNumbers}
                trackColor={{ false: colors.trackFalse, true: colors.trackTrue }}
                thumbColor={includeNumbers ? colors.thumbTrue : colors.thumbFalse}
              />
            </View>
            <View style={styles.input_group}>
              <Text style={styles.label}>Include symbols</Text>
              <Switch
                value={includeSymbols}
                onValueChange={setIncludeSymbols}
                trackColor={{ false: colors.trackFalse, true: colors.trackTrue }}
                thumbColor={includeSymbols ? colors.thumbTrue : colors.thumbFalse}
              />
            </View>
            <View style={styles.input_group}>
              <Text style={styles.label}>Keyword</Text>
              <TextInput
                value={values.keyword}
                style={styles.input}
                placeholder='Optional'
                onChangeText={handleChange('keyword')}
              />
            </View>
            <Button
              label='Generate Password'
              disabled={!isValid}
              onPress={handleSubmit}
              onLongPress={() => {
                resetPasswordState()
                handleReset()
              }}
            />
          </>
        )}
      </Formik>
      <Text style={styles.title}>{password}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.colorText,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: 'bold',
  },
  input_group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: colors.colorText,
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    borderColor: colors.colorText,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    color: colors.colorText,
    width: 80
  },
  errorText: {
    color: colors.errorText,
  }
})