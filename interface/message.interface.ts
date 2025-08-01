import { Subscription } from "./subscription.interface";

export interface Message {
    id: string;
    text: string;
    createdAt: Date;
    sender: 'user' | 'gemini';
    type: string;
}

export interface BaseResponse {
  type: string;
  success: boolean;
  message: string;
  timestamp: string;
  conversationId?: string;
}

// Greeting response
export interface GreetingResponse extends BaseResponse {
  type: 'greeting';
  success: true;
  data: {
    welcomeMessage: string;
    availableFeatures: string[];
  };
}

// Subscription success response
export interface SubscriptionSuccessResponse extends BaseResponse {
  type: 'subscription';
  success: true;
  data: {
    subscription: Subscription;
    action: 'created' | 'updated' | 'validated';
  };
}

// Subscription error response
export interface SubscriptionErrorResponse extends BaseResponse {
  type: 'subscription';
  success: false;
  data: {
    missing_fields: string[];
    current_data: Partial<Subscription>;
    suggestions?: string[];
  };
}

// General response
export interface GeneralResponse extends BaseResponse {
  type: 'general';
  success: true;
  data: {
    content: string;
    relatedTopics?: string[];
  };
}

// Error response
export interface ErrorResponse extends BaseResponse {
  type: 'error';
  success: false;
  data: {
    errorCode: string;
    details?: any;
  };
}

// Union type for all possible responses
export type GeminiResponse = 
  | GreetingResponse 
  | SubscriptionSuccessResponse 
  | SubscriptionErrorResponse 
  | GeneralResponse 
  | ErrorResponse;