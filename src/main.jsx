import React from 'react'
import ReactDOM from 'react-dom/client'
import './config/firebase'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./scss/global.scss"
import "./index.css"
import AppRouter from './routes/Router'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
)
