'use client'

import React from 'react'
import { Container, Row, Col, Button, Progress } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import Chart from 'react-apexcharts'
import { FaDownload, FaCircle, FaChartLine, FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import './analytics.scss'

const Analytics = () => {
  const { t } = useTranslation()

  const barChartOptions: any = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '45%',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#94a3b8' }
      }
    },
    colors: ['#2563eb'],
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
    },
  }

  const barChartSeries = [
    {
      name: 'Review Volume',
      data: [210, 280, 340, 230, 450, 180, 120],
    },
  ]

  const regions = [
    { name: 'North America', value: 423, percentage: 34, color: 'primary' },
    { name: 'Europe', value: 312, percentage: 25, color: 'secondary' },
    { name: 'Asia Pacific', value: 287, percentage: 23, color: 'info' },
    { name: 'Latin America', value: 156, percentage: 12, color: 'warning' },
    { name: 'Other', value: 69, percentage: 6, color: 'light' },
  ]

  return (
    <Container fluid className="analytics-container">
      <div className="analytics-header">
        <div className="header-left">
          <h2>{t('analytics_dashboard')}</h2>
          <p>{t('real_time_moderation_insights_and_trends')}</p>
        </div>
        <div className="header-actions">
          <Button color="primary" outline className="btn-export">
            <FaDownload /> {t('export_report')}
          </Button>
          <div className="operational-status">
            <span className="dot"></span>
            {t('all_systems_operational')}
          </div>
        </div>
      </div>

      <div className="live-data-section">
        <div className="section-title">
          <FaCircle className="live-dot" /> {t('live_data')}
        </div>
        <Row>
          <Col xl="3" md="6">
            <div className="stat-card">
              <div className="card-icon blue">
                <FaChartLine />
              </div>
              <div className="card-info">
                <h3>1,247</h3>
                <p>{t('total_reviews_today')}</p>
                <span className="trend positive">+12%</span>
              </div>
            </div>
          </Col>
          <Col xl="3" md="6">
            <div className="stat-card">
              <div className="card-icon green">
                <FaClock />
              </div>
              <div className="card-info">
                <h3>23s</h3>
                <p>{t('avg_review_time')}</p>
                <span className="trend positive">-8%</span>
              </div>
            </div>
          </Col>
          <Col xl="3" md="6">
            <div className="stat-card">
              <div className="card-icon orange">
                <FaExclamationTriangle />
              </div>
              <div className="card-info">
                <h3>3.2%</h3>
                <p>{t('escalation_rate')}</p>
                <span className="trend positive">-15%</span>
              </div>
            </div>
          </Col>
          <Col xl="3" md="6">
            <div className="stat-card">
              <div className="card-icon purple">
                <FaCheckCircle />
              </div>
              <div className="card-info">
                <h3>98.7%</h3>
                <p>{t('accuracy_score')}</p>
                <span className="trend positive">+2%</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Row className="mt-4">
        <Col xl="7">
          <div className="chart-card">
            <h3>{t('weekly_review_volume')}</h3>
            <Chart options={barChartOptions} series={barChartSeries} type="bar" height={300} />
          </div>
        </Col>
        <Col xl="5">
          <div className="region-card">
            <h3>{t('content_by_region')}</h3>
            <div className="region-list">
              {regions.map((region) => (
                <div key={region.name} className="region-item">
                  <div className="region-info">
                    <span>{region.name}</span>
                    <strong>{region.value} ({region.percentage}%)</strong>
                  </div>
                  <Progress value={region.percentage} color={region.color} size="xs" />
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xl="6">
          <div className="threat-card">
            <h3>{t('threat_categories')}</h3>
            {/* Placeholder for threat categories chart */}
            <div className="placeholder-chart">
               <p className="text-muted">Threat category breakdown chart</p>
            </div>
          </div>
        </Col>
        <Col xl="6">
          <div className="performance-card">
            <h3>{t('team_performance')}</h3>
             {/* Placeholder for team performance list */}
             <div className="placeholder-list">
               <p className="text-muted">Team performance metrics</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Analytics
