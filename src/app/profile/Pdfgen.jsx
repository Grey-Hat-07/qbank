import React from 'react'
import { useEffect, useState } from 'react'
import { Document, Page, Text, StyleSheet, View, PDFViewer } from '@react-pdf/renderer'
import { parseCookies } from 'nookies'


const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: '20pt',
    },
    section: {
      marginBottom: '10pt',
    },
    title: {
      fontSize: '18pt',
      fontWeight: 'bold',
      // marginBottom: '10pt',
      textAlign: 'center',
    },
    subject: {
      fontSize: '14pt',
      marginBottom: '10pt',
      textAlign: 'center',
    },
    marks: {
      fontSize: '14pt',
      marginBottom: '10pt',
      textAlign: 'center',
      flexDirection: 'column',
    },
    question: {
      fontSize: '12pt',
      marginBottom: '10pt',
      marginTop: '10pt',
    },
    questionMarks: {
      fontSize: '12pt',
      textAlign: 'right',
      marginBottom: '10pt',
      marginTop: '10pt',
      marginLeft: 'auto',
    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    questionType: {
      fontSize: '13pt',
      marginBottom: '10pt',
      marginTop: '10pt',
    },
    time:{
      fontSize: '13pt',
      marginBottom: '10pt',
      marginTop: '10pt',
      textAlign: 'right',
    }
  })
export default function Pdfgen({data}) {
    console.log(data)
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  )
}
