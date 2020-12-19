import { StyleSheet } from "react-native";
import { colors } from "../constants";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.darkColor,
    padding: 24,
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    borderColor: colors.lightColor,
    // paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  input: {
    flex: 1,
  },
  label: {
    color: colors.lightColor,
    marginBottom: 8,
  },
  forgotPassword: {
    color: colors.lightColor,
    textAlign: 'right',
    marginBottom: 8,
  },
  textWhite: {
    color: colors.lightColor,
  },
  textPrimary: {
    color: colors.primaryColor,
  },
  error: {
    color: '#cb6d51'
  }
})