import {toast, Slide} from "react-toastify";

export const notificacao = (msg: string) => toast.success(msg,{
    icon:() => "🎮",
    transition: Slide,
    theme: "light"
});
export const erro = (msg:string) => toast.error(msg,{
    icon:() => "🎮",
    transition: Slide,
    theme: "light"
});
export const toastConfirmarExclusao = (aoConfirmar: () => void) => {
        toast(
                ({ closeToast }) => (
                        <div>
                        <p>Deseja realmente excluir?</p>
                        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                        <button style={{ border: "none", padding: "8px", borderRadius: "5px", backgroundColor: "#ff004c", cursor: "pointer", color: "#221c2d"}}
                        onClick={() => {
                                aoConfirmar();
                                closeToast();
                        }}
                        >
                        Sim
                        </button>
                        
                        <button onClick={closeToast} style={{ border: "none", padding: "8px", borderRadius: "5px", backgroundColor: "#ff004c", cursor: "pointer", color: "#221c2d"}}>
                        Cancelar
                        </button>
                        </div>
                        </div>
                ),
                {
                        autoClose: false,
                        closeOnClick: false,
                        draggable: false,
                }
        );
};