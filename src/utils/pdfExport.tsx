import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#E4E4E4', padding: 30 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 10 },
  subheader: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#666' },
  contactInfo: { fontSize: 12, textAlign: 'center', marginBottom: 20, color: '#333' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#000', borderBottomStyle: 'solid', paddingBottom: 5, marginTop: 15, marginBottom: 10 },
  itemTitle: { fontSize: 12, fontWeight: 'bold', marginTop: 10 },
  itemSubtitle: { fontSize: 11, color: '#666' },
  itemDate: { fontSize: 10, color: '#888', textAlign: 'right' },
  itemDescription: { fontSize: 10, marginTop: 5 },
  skillTag: { fontSize: 10, backgroundColor: '#eee', paddingVertical: 3, paddingHorizontal: 6, borderRadius: 4, marginRight: 5, marginBottom: 5 },
});

interface ResumePDFProps {
  resume: any;
}

const ResumePDF: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.header}>{resume.basicInfo.name}</Text>
        <Text style={styles.subheader}>{resume.basicInfo.title}</Text>
        <Text style={styles.contactInfo}>
          {resume.basicInfo.email} | {resume.basicInfo.phone} | {resume.basicInfo.location}
        </Text>
      </View>

      {resume.basicInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>个人简介</Text>
          <Text style={styles.itemDescription}>{resume.basicInfo.summary}</Text>
        </View>
      )}

      {resume.workExperiences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>工作经历</Text>
          {resume.workExperiences.map((exp: any, index: number) => (
            <View key={index} style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.currentlyWorking ? '至今' : exp.endDate}
                </Text>
              </View>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              <Text style={styles.itemDescription}>{exp.description}</Text>
              {exp.achievements.length > 0 && (
                <View>
                  <Text style={{ fontSize: 10, marginTop: 5 }}>主要成就:</Text>
                  {exp.achievements.map((achievement: string, idx: number) => (
                    <Text key={idx} style={{ fontSize: 10, marginLeft: 10 }}>- {achievement}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {resume.educations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>教育经历</Text>
          {resume.educations.map((edu: any, index: number) => (
            <View key={index} style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemTitle}>{edu.school}</Text>
                <Text style={styles.itemDate}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
              <Text style={styles.itemSubtitle}>{edu.degree} - {edu.major}</Text>
            </View>
          ))}
        </View>
      )}

      {resume.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>技能</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {resume.skills.map((skill: any, index: number) => (
              <Text key={index} style={styles.skillTag}>{skill.name}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;
