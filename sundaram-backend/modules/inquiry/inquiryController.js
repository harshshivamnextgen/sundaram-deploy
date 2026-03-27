const ApiError = require('../../utils/api-error');
const { sendListResponse, sendResponse, parsePagination, calculatePagination } = require('../../utils/api-response');
const { sendEmail } = require('../../utils/email');
const config = require('../../config/env');
const inquiryService = require('./inquiryService');

const notifyAdminOfInquiry = async (inquiry) => {
  if (!config.adminEmail) {
    return;
  }
  await sendEmail({
    to: config.adminEmail,
    subject: `New ${inquiry.type} inquiry from ${inquiry.name}`,
    text: `From: ${inquiry.email}\nPhone: ${inquiry.phone}\nMessage: ${inquiry.message}`,
  });
};

const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await inquiryService.createInquiry(req.body);
    await notifyAdminOfInquiry(inquiry);
    return sendResponse(res, inquiry, 201, 'Inquiry created successfully');
  } catch (error) {
    return next(error);
  }
};

const getInquiries = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req);
    const search = (req.query.search || '').toString().trim();

    const { inquiries, total } = await inquiryService.getInquiriesList({
      skip,
      limit,
      search,
    });
    const pagination = calculatePagination(page, limit, total);
    return sendListResponse(res, inquiries, 200, 'Inquiries retrieved successfully', pagination);
  } catch (error) {
    return next(error);
  }
};

const getInquiry = async (req, res, next) => {
  try {
    const inquiry = await inquiryService.getInquiryById(req.params.id);
    if (!inquiry) {
      return sendResponse(res, null, 200, 'Inquiry not found');
    }
    return sendResponse(res, inquiry, 200, 'Inquiry retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await inquiryService.updateStatus(req.params.id, status);
    if (!inquiry) {
      return sendResponse(res, null, 200, 'Inquiry not found');
    }
    return sendResponse(res, inquiry, 200, 'Inquiry status updated successfully');
  } catch (error) {
    return next(error);
  }
};

const replyToInquiry = async (req, res, next) => {
  try {
    const inquiry = await inquiryService.getInquiryById(req.params.id);
    if (!inquiry) {
      return sendResponse(res, null, 200, 'Inquiry not found');
    }

    await sendEmail({
      to: inquiry.email,
      subject: `Reply from Indigo team`,
      text: req.body.message,
    });

    inquiry.status = 'replied';
    await inquiry.save();
    return sendResponse(res, inquiry, 200, 'Reply sent successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiryStatus,
  replyToInquiry,
};
