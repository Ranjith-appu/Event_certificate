import React, { useState, useRef, useEffect } from 'react';
import { 
  Award, 
  MapPin, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  FileCheck, 
  QrCode, 
  AlertCircle,
  X,
  RefreshCw,
  Navigation
} from 'lucide-react';
import { useHackathon } from '../context/HackathonContext';
import { EVENT_DETAILS } from '../data/ncoreData';
import { playClickSound, playSuccessSound, playAlertSound } from '../utils/audio';

// Arunai Engineering College Campus Target Coordinates (12.1922, 79.0833)
const CAMPUS_COORDS = { lat: 12.1922, lng: 79.0833 };
const GEOFENCE_RADIUS_METERS = 2500; // 2.5km campus geofence

// Haversine formula to compute distance in meters
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const CertificateCenter = () => {
  const { 
    teams, 
    currentUser, 
    selectedTeamForCert, 
    isCertificateEnabled, 
    setActiveModal 
  } = useHackathon();
  const canvasRef = useRef(null);

  const [selectedTeamId, setSelectedTeamId] = useState(() => {
    return selectedTeamForCert?.teamId || currentUser?.teamId || teams[0]?.teamId;
  });

  const [selectedMemberName, setSelectedMemberName] = useState(() => {
    const t = teams.find(team => team.teamId === selectedTeamId) || teams[0];
    return t?.leaderName || 'Participant';
  });

  const [isVerifyingLoc, setIsVerifyingLoc] = useState(false);
  const [isLocationVerified, setIsLocationVerified] = useState(false);
  const [locationMessage, setLocationMessage] = useState('');
  const [deviceCoords, setDeviceCoords] = useState(null);
  const [isCertGenerated, setIsCertGenerated] = useState(false);
  const [certHash, setCertHash] = useState('');

  const currentTeam = teams.find(t => t.teamId === selectedTeamId) || teams[0];

  useEffect(() => {
    if (currentTeam && currentTeam.members?.length > 0) {
      setSelectedMemberName(currentTeam.members[0].name);
    }
  }, [selectedTeamId]);

  // Real GPS Geolocation Check (Strict 12.1922, 79.0833 geofence)
  const handleVerifyDeviceGPS = () => {
    playClickSound();
    setIsVerifyingLoc(true);
    setLocationMessage('Querying device GPS sensors for physical presence at Arunai Engineering College campus...');

    if (!navigator.geolocation) {
      setIsLocationVerified(false);
      setLocationMessage('ERROR: Geolocation API is not supported by your browser or operating system.');
      setIsVerifyingLoc(false);
      playAlertSound();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        setDeviceCoords({ lat: userLat, lng: userLng });

        const distance = getDistanceFromLatLonInMeters(
          userLat,
          userLng,
          CAMPUS_COORDS.lat,
          CAMPUS_COORDS.lng
        );

        if (distance <= GEOFENCE_RADIUS_METERS) {
          setIsLocationVerified(true);
          setLocationMessage(
            `✓ GEOFENCE VERIFIED: Physical presence confirmed on-campus at Arunai Engineering College.`
          );
          playSuccessSound();
        } else {
          // Strictly reject generation outside coordinates
          setIsLocationVerified(false);
          setLocationMessage(
            `❌ ACCESS DENIED: OUTSIDE CAMPUS. Your device is detected outside Arunai Engineering College campus. Certificate generation is strictly restricted to on-campus participants.`
          );
          playAlertSound();
        }
        setIsVerifyingLoc(false);
      },
      (err) => {
        setIsLocationVerified(false);
        setLocationMessage(
          `❌ GPS VERIFICATION FAILED: ${err.message || 'Permission denied or timed out'}. Please enable location permissions and ensure you are on the Arunai Engineering College campus to generate certificates.`
        );
        setIsVerifyingLoc(false);
        playAlertSound();
      },
      { timeout: 10000, enableHighAccuracy: true, maximumAge: 0 }
    );
  };

  // Administrative Override for Testing (Only accessible to authenticated Admin)
  const handleAdminOverrideCampus = () => {
    playClickSound();
    setIsVerifyingLoc(true);
    setLocationMessage('Applying Admin Authorized Campus Verification Override...');

    setTimeout(() => {
      setDeviceCoords(CAMPUS_COORDS);
      setIsLocationVerified(true);
      setLocationMessage(
        '✓ ADMIN OVERRIDE VERIFIED: Arunai Engineering College Campus Presence Verified.'
      );
      setIsVerifyingLoc(false);
      playSuccessSound();
    }, 600);
  };

  // Generate Certificate onto HTML5 Canvas
  const handleGenerateCertificate = () => {
    if (!isCertificateEnabled) {
      playAlertSound();
      setLocationMessage('Certificate generation is currently locked by the Hackathon Admin.');
      return;
    }

    if (!isLocationVerified) {
      playAlertSound();
      setLocationMessage('Access Denied: You must be physically present on the Arunai Engineering College campus to generate your certificate.');
      return;
    }

    playClickSound();
    const hash = 'NCORE-CERT-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
    setCertHash(hash);
    setIsCertGenerated(true);

    setTimeout(() => {
      drawCertificate(hash);
      playSuccessSound();
    }, 200);
  };

  const drawCertificate = (hash) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // 1. Prestigious Certificate Background (Subtle Ivory Parchment / Clean White)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Subtle soft background radial accent
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 600);
    bgGrad.addColorStop(0, '#f8fafc');
    bgGrad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(15, 15, width - 30, height - 30);

    // 2. High-Precision Double Border (Cobalt & Gold)
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(42, 42, width - 84, height - 84);

    // Corner Ornament Nodes
    const corners = [
      [30, 30], [width - 30, 30], [30, height - 30], [width - 30, height - 30]
    ];
    ctx.fillStyle = '#0284c7';
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Institution Header Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 15px Rajdhani, sans-serif';
    ctx.fillText('ARUNAI ENGINEERING COLLEGE (AN AUTONOMOUS INSTITUTION) • TIRUVANNAMALAI', width / 2, 90);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 17px Rajdhani, sans-serif';
    ctx.fillText('DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING', width / 2, 116);

    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 13px Rajdhani, sans-serif';
    ctx.fillText('IN ASSOCIATION WITH i-GROW (STUDENT ASSOCIATION) & POINTERS', width / 2, 139);

    // 4. Main Certificate Title
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 36px Orbitron, sans-serif';
    ctx.fillText('CERTIFICATE OF PARTICIPATION', width / 2, 210);

    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 20px Orbitron, sans-serif';
    ctx.fillText('NCORE 2026 • 12HRS HACKATHON', width / 2, 250);

    ctx.fillStyle = '#64748b';
    ctx.font = '15px Inter, sans-serif';
    ctx.fillText('This is to certify that', width / 2, 310);

    // 5. Recipient Name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 38px Rajdhani, sans-serif';
    ctx.fillText(selectedMemberName.toUpperCase(), width / 2, 365);

    // Underline beneath name
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 250, 385);
    ctx.lineTo(width / 2 + 250, 385);
    ctx.stroke();

    // 6. Affiliation & Participation Details
    ctx.fillStyle = '#334155';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText(`from ${currentTeam.college}`, width / 2, 425);

    const bodyText = `has successfully competed in the national-level 12-Hour Hackathon on the theme "${currentTeam.domainName}"`;
    ctx.fillText(bodyText, width / 2, 465);

    const subBodyText = `under Team "${currentTeam.teamName}" with the prototype "${currentTeam.projectTitle}"`;
    ctx.fillText(subBodyText, width / 2, 495);

    const dateText = `conducted on 09 October 2026 at Arunai Engineering College, Tiruvannamalai.`;
    ctx.fillText(dateText, width / 2, 525);

    // 7. Slogan from Brochure
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 14px Orbitron, sans-serif';
    ctx.fillText('THINK. BUILD. SOLVE. MAKE AN IMPACT. • PRESENTED BY POINTERS', width / 2, 575);

    // 8. Signatures of Conveners (from brochure)
    const sigY = 680;

    // Convener 1: Mrs. V. Umadevi
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0369a1';
    ctx.font = 'italic 18px cursive, sans-serif';
    ctx.fillText('V. Umadevi', 240, sigY - 20);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(140, sigY);
    ctx.lineTo(340, sigY);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('Mrs. V. Umadevi', 240, sigY + 20);
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Convener • HOD (UG), CSE', 240, sigY + 36);

    // Central Verified Stamp with Coordinate Tag
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(width / 2 - 130, sigY - 45, 260, 90);
    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 12px Orbitron, sans-serif';
    ctx.fillText('LOCATION VERIFIED', width / 2, sigY - 18);
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(hash, width / 2, sigY + 2);
    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('ON-CAMPUS ATTENDANCE VERIFIED', width / 2, sigY + 18);
    ctx.fillStyle = '#64748b';
    ctx.font = '9px monospace';
    ctx.fillText('ARUNAI ENGINEERING COLLEGE CAMPUS', width / 2, sigY + 32);

    // Convener 2: Dr. P. Anandan
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0369a1';
    ctx.font = 'italic 18px cursive, sans-serif';
    ctx.fillText('Dr. P. Anandan', width - 240, sigY - 20);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width - 340, sigY);
    ctx.lineTo(width - 140, sigY);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('Dr. P. Anandan', width - 240, sigY + 20);
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Convener • Professor, CSE', width - 240, sigY + 36);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `NCORE_Certificate_${selectedMemberName.replace(/\s+/g, '_')}.png`;
    a.click();
    playClickSound();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border-2 border-sky-300 rounded-2xl p-6 sm:p-8 my-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="hud-corner-tl !border-sky-400"></div>
        <div className="hud-corner-tr !border-sky-400"></div>
        <div className="hud-corner-bl !border-sky-400"></div>
        <div className="hud-corner-br !border-sky-400"></div>

        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            setActiveModal(null);
          }}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Admin Lock Warning Banner */}
        {!isCertificateEnabled && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wider">
                CERTIFICATE ISSUANCE CURRENTLY LOCKED BY ADMIN
              </span>
              <p className="text-xs text-amber-800 font-sans">
                Certificate generation has not been enabled by the Hackathon Director yet. The option will activate once final jury evaluations conclude and the Director turns on certificate distribution in the Admin Control Center.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 text-sky-700 text-xs font-mono font-bold">
            <Award className="w-4 h-4 text-sky-600" />
            <span>AUTHENTICATED ACCREDITATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-tech text-slate-900 tracking-tight">
            CERTIFICATE CENTER
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            Your participation has been recorded. Complete on-campus physical verification at Arunai Engineering College to generate your official signed certificate.
          </p>
        </div>

        {/* Team and Member Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 shadow-xs">
          <div>
            <label className="block text-[11px] font-mono text-slate-600 font-semibold mb-1">SELECT REGISTERED TEAM</label>
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 font-tech focus:border-sky-500 focus:outline-none"
            >
              {teams.map(t => (
                <option key={t.teamId} value={t.teamId}>
                  {t.teamName} ({t.teamId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-600 font-semibold mb-1">CANDIDATE MEMBER NAME</label>
            <select
              value={selectedMemberName}
              onChange={(e) => setSelectedMemberName(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-sky-800 font-mono font-bold focus:border-sky-500 focus:outline-none"
            >
              {currentTeam?.members?.map((m, idx) => (
                <option key={idx} value={m.name}>
                  {m.name} ({m.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Verification Box */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 mb-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>STEP 1: ON-CAMPUS GEOFENCE VERIFICATION</span>
              </div>
              <p className="text-xs text-slate-600 font-mono">
                Arunai Engineering College Physical Presence Verification (Campus Radius: 2.5km)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleVerifyDeviceGPS}
                disabled={isVerifyingLoc}
                className="px-4 py-2 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 hover:bg-sky-600 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {isVerifyingLoc ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
                <span>[ VERIFY DEVICE GPS ]</span>
              </button>

              {/* Administrative test override button, only displayed for authenticated Director */}
              {currentUser?.role === 'admin' && (
                <button
                  onClick={handleAdminOverrideCampus}
                  disabled={isVerifyingLoc}
                  className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100 text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="Director Testing Override: Campus Presence Verified"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>[ ADMIN GPS OVERRIDE ]</span>
                </button>
              )}
            </div>
          </div>

          {locationMessage && (
            <div className={`p-3.5 rounded-lg text-xs font-mono flex items-start gap-2.5 ${
              isLocationVerified 
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-800' 
                : 'bg-rose-50 border border-rose-300 text-rose-800'
            }`}>
              {isLocationVerified ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{locationMessage}</span>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="mb-6">
          <button
            onClick={handleGenerateCertificate}
            disabled={!isLocationVerified || !isCertificateEnabled}
            className={`w-full py-3.5 rounded-xl font-tech font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
              isLocationVerified && isCertificateEnabled
                ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm cursor-pointer'
                : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {!isCertificateEnabled 
                ? '[ CERTIFICATE ISSUANCE CURRENTLY DISABLED BY ADMIN ]' 
                : !isLocationVerified 
                ? '[ VERIFY ON-CAMPUS LOCATION TO UNLOCK CERTIFICATE ]' 
                : '[ GENERATE OFFICIAL CERTIFICATE ]'}
            </span>
          </button>
        </div>

        {/* Certificate Preview & Download */}
        {isCertGenerated && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-sky-800 flex items-center gap-1.5 font-bold">
                <FileCheck className="w-4 h-4 text-sky-600" />
                <span>OFFICIAL CERTIFICATE READY • ON-CAMPUS VERIFIED</span>
              </span>

              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-tech font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PNG</span>
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border-2 border-slate-200 shadow-md bg-white flex justify-center p-2">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateCenter;
