import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {Toaster} from "sonner"
import './App.css'
import ControlLayout from "./layouts/ControlLayout"
import AuthButton from "./components/ui/Global/AuthButton"
import StudioTray from "./components/ui/Global/StudioTray"

const client = new QueryClient()

function App() {

  return (
    <div>
      <StudioTray />
    </div>
  )
}

export default App
