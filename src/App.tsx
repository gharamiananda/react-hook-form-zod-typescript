
import CustomButton from './components/button/CustomButton'
import ProductTable from './components/table/ProductTable'
import { UsersProvider } from './components/user'







import { FiCheck } from 'react-icons/fi'; // Using react-icons for icons




function App() {

  return (
    <>

    <UsersProvider  />




    

      <ProductTable/>


      <div className="space-y-4">
        <CustomButton onClick={() => alert('Clicked!')} color="text-white" bgColor="bg-green-500">

          Default Button
        </CustomButton>
        <CustomButton onClick={() => alert('Clicked!')} color="text-white" bgColor="bg-red-500" icon={<FiCheck />} iconPosition="front">
          Button with Icon
        </CustomButton>
        <CustomButton onClick={() => alert('Clicked!')} color="text-white" bgColor="bg-blue-500" loading>
          Loading Button
        </CustomButton>
        <CustomButton onClick={() => alert('Clicked!')} color="text-white" bgColor="bg-gray-500" disabled>
          Disabled Button
        </CustomButton>
      </div>
</>




  )

}

export default App



