/**
 * A button component
 * @typedef {Object} ButtonProps
 * @param {Object} props - The properties for the button
 * @param {React.ReactNode} props.children - The content of the button
 * @param {function} props.onClick - The function to call when the button is clicked
 * @param {string} props.className - class name for styling the button
 * @param {string} props.color - color of the button, can be "blue" or "white" 
 * @returns {JSX.Element} The Button component
 */


export const Button = ({children,onClick,type,className="",color="", size="", shape=""})=>{
    const shapeClass = 
    shape === "rectangle" ? "rounded-md" : 
    shape === "circle" ? "rounded-full w-10 h-10" : 
    shape === "circlemedium" ? "rounded-full w-17.25 h-17.25" : ""
    const defaultClass = "p-2 cursor-pointer"
    const colorClass = 
    color === "blue" ? "bg-primary border border-white text-white" : 
    color === "white" ? "border border-primary text-primary" :
    color === "active" ? "bg-active/20 text-active" : 
    color === "important" ? "bg-important/20 text-important" : 
    color === "used" ? "bg-gray-200 text-gray-500" : 
    color === "paid" ? "bg-primary/20 text-primary" :
    color === "gray" ? "bg-secondary" : "";
    const sizeClass = 
    size === "small" ? "w-[81px] h-[48px] py-2" : 
    size === "medium" ? "w-[188px] h-[56px] py-2" : 
    size === "large" ? "w-[284px] h-[56px] h-12 py-2" : 
    size === "full" ? "w-full h-12 py-2" : "";
    
    const finalClass =`${shapeClass} ${defaultClass} ${className} ${colorClass} ${sizeClass} `
    return (
        <button className={finalClass} type={type}  onClick={onClick}>{children}
        </button>
    )
}