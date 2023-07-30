import React from 'react'
import { useEffect, useState } from 'react'
import { Document, Page, Text, StyleSheet, View, PDFViewer } from '@react-pdf/renderer'

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
  }
})

export default function Pdfgen({ data, marks, subject, title }) {
  console.log({ data, marks, subject, title })
  const [jsonData, setJsonData] = useState()
  const [Subject, setSubject] = useState()
  useEffect(() => {
    setSubject(subject)
    setJsonData(data)
  }, [data])
  const [prevmarks, setPrevmarks] = useState(0)

  return (

    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subject}>Subject : {Subject}</Text>
          <Text style={styles.marks}>Total Marks: {marks}</Text>
        </View>
        <View style={styles.section}>
          {data &&
            data.map((item, index) => (
              <View key={index} style={styles.flex}>
                <Text style={styles.question}>
                  {index + 1}. {item.question}
                </Text>
                <Text style={styles.questionMarks}>
                  {item.marks}
                </Text>
              </View>
            ))
          }
        </View>
      </Page>
    </Document>

  )
}
