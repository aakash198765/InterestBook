const uiFields = {
    customSubmitButton: (props) => {
      return (
        <button type="submit">{props.required ? 'Save *' : 'Save'}</button>
      );
    },
};

export default uiFields