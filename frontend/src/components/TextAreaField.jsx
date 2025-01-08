export const TextAreaField = ({ label, value, onChange, type = "text" }) => (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  );