import {string, object, date} from 'yup';

export const RegistrationSchema = object({
  cardNumber: string()
    .min(16)
    .max(16)
    .matches(
      /\d{16}/,
      'Use only 16 digit number. No letters, symbols or spaces',
    )
    .required()
    .default(''),
  userName: string()
    .min(2)
    .max(50)
    .matches(/^[a-zA-Z]+[^0-9]+/, 'Use only letters. No numbers, symbols')
    .required()
    .default(''),
  expiry: string()
    .required()
    .min(4)
    .max(4)
    .matches(/\d{4}/, 'Use only numbers. No letters, symbols or spaces ')
    .default(''),
  cvv: string()
    .required()
    .min(3)
    .max(3)
    .matches(/\d{3}/, 'Use only numbers. No letters, symbols or spaces')
    .default(''),
});

export const PersonalInfoSchema = object({
  lastName: string().required("Прізвище обов'язкове"),
  firstName: string().required("Ім'я обов'язкове"),
  middleName: string().required("По батькові обов'язково"),
  birthDate: date().required("Дата народження обов'язкова"),
  taxNumber: string().matches(/\d{10}/, "ІПН обов'язковий"),
  passportSeries: string().required("Серія паспорта обов'язкова"),
  passportNumber: string().matches(/\d/, "Номер паспорта обов'язковий"),
  passportIssuedBy: string().required("Ким виданий паспорт обов'язково"),
  passportIssueDate: date().required("Дата видачі паспорта обов'язкова"),
  registrationRegion: string().required("Область реєстрації обов'язкова"),
  registrationCity: string().required("Місто реєстрації обов'язкове"),
  registrationStreet: string().required("Вулиця реєстрації обов'язкова"),
  registrationHouse: string().required("Номер будинку реєстрації обов'язковий"),
  registrationBuilding: string(),
  registrationApartment: string(),
  actualRegion: string().required("Область фактичного проживання обов'язкова"),
  actualCity: string().required("Місто фактичного проживання обов'язкове"),
  actualStreet: string().required("Вулиця фактичного проживання обов'язкова"),
  actualHouse: string().required(
    "Номер будинку фактичного проживання обов'язковий",
  ),
  actualbuilding: string(),
  actualapartment: string(),
});
