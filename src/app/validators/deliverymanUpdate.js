import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
    email: Yup.string()
      .email()
      .required(),
    name: Yup.string(),
    avatar_id: Yup.number(),
  });

  schema
    .validate({ ...req.body, ...req.params }, { abortEarly: false })
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
