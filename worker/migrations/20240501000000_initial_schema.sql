-- Create article_views_aggregation table for analytics
CREATE TABLE IF NOT EXISTS article_views_aggregation (
    article_id VARCHAR(255) NOT NULL,
    view_date DATE NOT NULL,
    total_views INTEGER DEFAULT 0,
    PRIMARY KEY (article_id, view_date)
);

-- Create dispatched_notifications table for idempotency
CREATE TABLE IF NOT EXISTS dispatched_notifications (
    event_id UUID PRIMARY KEY,
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create activity_logs table for dashboard projections
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    event_id UUID UNIQUE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL,
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
