import Swal from "sweetalert2"

export const showSuccessMessage = (title: string, text: string) => {
    return Swal.fire({
        icon: "success",
        title,
        text,
        showConfirmButton: false,
        timer: 2000,
    })
}

export const showErrorMessage = (title: string, text: string) => {
    return Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonColor: "#2563EB",
    })
}
