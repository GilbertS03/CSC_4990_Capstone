import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/auth';
import { decodeToken } from '../utils/jwt';
import api from '../services/api/api'

const AuthContext = createContext(null);
