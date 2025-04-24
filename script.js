document.getElementById('attendanceForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const type = document.getElementById('type').value;

  // Google Apps Script로 데이터 전송하기 (예시 URL 사용)
  fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
    method: 'POST',
    body: JSON.stringify({ name, type, timestamp: new Date().toLocaleString() }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => alert('출석 체크 완료!'))
  .catch(error => alert('출석 체크 실패!'));

  // 폼 리셋
  document.getElementById('attendanceForm').reset();
});
