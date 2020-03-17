import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    street: Yup.string().required(),
    number: Yup.number()
      .required()
      .max(9999999),
    complement: Yup.string(),
    city: Yup.string().required(),
    state: Yup.string()
      .required()
      .length(2),
    postal_code: Yup.string()
      .required()
      .matches(/[0-9]{5}[\d]{3}/),
  });

  schema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(errors => {
      const schemaErrors = errors.inner.map(err => {
        return { field: err.path, message: err.message };
      });

      return res.status(400).json({
        message: 'some fields are not valid',
        fields: schemaErrors,
      });
    });
};
