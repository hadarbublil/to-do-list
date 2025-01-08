export const InputField = ({ label, value, onChange, type = "text" }) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  );