import React from 'react';
import { Formik, Field, Form } from 'formik';


function NewProduct() {

  return (
  <div>
    <h1>Add A Product</h1>
    <Formik
      initialValues={{
        productName: '',
        productDescription: '',
        productPrice: 0,
        productImage: ''
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="productName">Product Name</label>
        <Field class='field' id="productName" name="productName" />

        <label htmlFor="productDescription">Product Description</label>
        <Field class='field' id="productDescription" name="productDescription" />

        <label htmlFor="productPrice">Product Price</label>
        <Field
          class='field'
          id="productPrice"
          name="productPrice"
          type='number'
        />

        <label htmlFor="productImage">Product Image</label>
        <Field
          class='field'
          id="productImage"
          name="productImage"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
  )
};

export default NewProduct;



// class Form extends Component {

	// state = {

	// 	// Initially, no file is selected
	// 	selectedFile: null
	// };

	// // On file select (from the pop up)
	// onFileChange = event => {

	// 	// Update the state
	// 	this.setState({ selectedFile: event.target.files[0] });

	// };

// 	// On file upload (click the upload button)
// 	onFileUpload = () => {

// 		// Create an object of formData
// 		const formData = new FormData();

// 		// Update the formData object
// 		formData.append(
// 			"myFile",
// 			this.state.selectedFile,
// 			this.state.selectedFile.name
// 		);

// 		// Details of the uploaded file
// 		console.log(this.state.selectedFile);

// 		// Request made to the backend api
// 		// Send formData object
// 		axios.post("api/uploadfile", formData);
// 	};

// 	// File content to be displayed after
// 	// file upload is complete
// 	fileData = () => {

// 		if (this.state.selectedFile) {

// 			return (
// 				<div>
// 					<h2>File Details:</h2>
// 					<p>File Name: {this.state.selectedFile.name}</p>

// 					<p>File Type: {this.state.selectedFile.type}</p>

// 					<p>
// 						Last Modified:{" "}
// 						{this.state.selectedFile.lastModifiedDate.toDateString()}
// 					</p>

// 				</div>
// 			);
// 		} else {
// 			return (
// 				<div>
// 					<br />
// 					<h4>Choose before Pressing the Upload button</h4>
// 				</div>
// 			);
// 		}
// 	};

// 	render() {

// 		return (
// 			<div>
// 				<h1>
// 					GeeksforGeeks
// 				</h1>
// 				<h3>
// 					File Upload using React!
// 				</h3>
// 				<div>
// 					<input type="file" onChange={this.onFileChange} />
// 					<button onClick={this.onFileUpload}>
// 						Upload!
// 					</button>
// 				</div>
// 				{this.fileData()}
// 			</div>
// 		);
// 	}
// }
