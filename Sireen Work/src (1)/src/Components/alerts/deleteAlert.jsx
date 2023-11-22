
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
const DeleteAlert=(  )=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to delete this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
            const userID=localStorage.getItem('user-id');
            const userType=localStorage.getItem('user-type');
            console.log(userType)
        const response=await axiosClient.post(`Articles/delete/${id}`,{userID,userType});
        console.log("delete")
    
        console.log(response)
             if(response.data['status']===200){
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                navigate('/Articles');
             }
             else{
                swalWithBootstrapButtons.fire(
                    response.data.message,
                    'Your Article has not been deleted',
                    'error'
                  )             }
          
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
   
}
export default DeleteAlert;