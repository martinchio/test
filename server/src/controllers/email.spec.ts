import request from 'supertest'
import express from 'express'
import emailRouter from "./email" 

// Mock the services and middlewares
jest.mock('@services/email')
jest.mock('@services/email');
jest.mock('@middleware/validateEmail', () => ({
  validateEmailData: jest.fn((req, res, next) => next())
}));

jest.mock('@middleware/auth', () => ({
  auth: jest.fn((req, res, next) => next())
}));

import { sendEmail, getEmails, getEmail, getEmailByAddress } from '@services/email'
import { validateEmailData } from '@middleware/validateEmail'
import { auth } from '@middleware/auth'

const app = express()
app.use(express.json())
app.use('/email', emailRouter)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

describe('Email Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('POST / - should send an email', async () => {
    (sendEmail as jest.Mock).mockResolvedValue('someEmailId')
    const mockData = {
      From: 'from@example.com',
      To: 'to@example.com',
      Subject: 'Test',
      TextBody: 'Test Body'
    }

    const response = await request(app)
      .post('/email')
      .send(mockData)

    expect(validateEmailData).toHaveBeenCalled();
    expect(auth).toHaveBeenCalled(); 
    expect(sendEmail).toHaveBeenCalledWith(mockData)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Email sent successfully', id: 'someEmailId' })
  })

  it('GET / - should retrieve emails', async () => {
    (getEmails as jest.Mock).mockResolvedValue([{ id: 'testEmail1' }, { id: 'testEmail2' }])
    const response = await request(app).get('/email?type=received')
    expect(auth).toHaveBeenCalled()
    expect(getEmails).toHaveBeenCalledWith('received')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
  })

  it('GET /:id - should retrieve an email by id', async () => {
    const mockEmailId = 'someEmailId';
    const mockEmail = {
        id: mockEmailId,
        From: 'from@example.com',
        To: 'to@example.com',
        Subject: 'Test',
        TextBody: 'Test Body'
    };

    (getEmail as jest.Mock).mockResolvedValue(mockEmail);

    const response = await request(app).get(`/email/${mockEmailId}`);

    expect(auth).toHaveBeenCalled();
    expect(getEmail).toHaveBeenCalledWith(mockEmailId);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEmail);
});

it('GET /address/:emailAddress - should retrieve emails by address', async () => {
    const mockEmailAddress = 'to@example.com';
    const mockEmails = [
        {
            id: 'emailId1',
            From: 'from1@example.com',
            To: mockEmailAddress,
            Subject: 'Test 1',
            TextBody: 'Test Body 1'
        },
        {
            id: 'emailId2',
            From: 'from2@example.com',
            To: mockEmailAddress,
            Subject: 'Test 2',
            TextBody: 'Test Body 2'
        }
    ];

    (getEmailByAddress as jest.Mock).mockResolvedValue(mockEmails);

    const response = await request(app).get(`/email/address/${mockEmailAddress}`);

    expect(auth).toHaveBeenCalled();
    expect(getEmailByAddress).toHaveBeenCalledWith(mockEmailAddress);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEmails);
});


})

