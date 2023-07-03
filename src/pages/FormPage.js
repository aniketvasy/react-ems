import FullWidthPage from "../components/FullWidthPage";

const FormPage = () => (
  <FullWidthPage>
    <h1>Welcome to the Form Page!</h1>
    <p>This page allows you to submit a name</p>
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />
      <br />
      <button type="submit">Submit</button>
    </form>
  </FullWidthPage>
);

export default FormPage;
